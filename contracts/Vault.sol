// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./interfaces/IBlast.sol";
import "./interfaces/IBlastPoints.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// Custom errors for better readability and debugging
error InsufficientShares();
error AmountMustBePositive();
error FailedToSendEther();
error InvalidYieldMode();
error FailedToWithdrawEther();

contract Vault is Ownable {
    mapping(address => uint256) public balanceOf;
    uint256 public playPrice;
    uint256 public killReward;
    address blastYield;

    // IBlast interface for enabling automatic yield collection
    constructor(
        address _blastYield,
        address _pointsOperator,
        address _blastPoints,
        address _initialOwner,
        address _gov,
        uint256 _playPrice,
        uint256 _killReward
    ) payable Ownable(_initialOwner) {
        blastYield = _blastYield;
        killReward = _killReward;
        // Initialize the IBlast contract
        IBlast blast = IBlast(_blastYield);
        // The contract balance will grow automatically over time due to yield collection
        blast.configureAutomaticYield();
        // Set to withdraw gas fee
        blast.configureClaimableGas();

        //Only this address can claim gas yield
        blast.configureGovernor(_gov);

        // Set to distrbitue Blast points and Blast Gold to users
        IBlastPoints(_blastPoints).configurePointsOperator(_pointsOperator);

        playPrice = _playPrice;
    }

    // Function to deposit ETH into the contract
    function depositETH() public payable {
        require(msg.value == playPrice, "Deposit amount is wrong");
    }

    // Function to withdraw ETH from the contract
    function withdrawETH(uint256 _amount) public onlyOwner {
        require(
            _amount <= address(this).balance,
            "Amount to withdarw is bigger than the current balance"
        );
        (bool sent, ) = payable(msg.sender).call{value: _amount}("");
        if (!sent) {
            revert FailedToWithdrawEther();
        }
    }

    // Function to withdraw ETH from the contract
    function sendETHTo(address receiver) public onlyOwner {
        (bool sent, ) = payable(receiver).call{value: killReward}("");
        if (!sent) {
            revert FailedToWithdrawEther();
        }
    }

    // Function to get the balance of a specific address
    function getETHBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function setPlayPrice(uint256 _newPlayPrice) public onlyOwner {
        playPrice = _newPlayPrice;
    }

    function claimMyContractsGas() public onlyOwner {
        IBlast(blastYield).claimAllGas(address(this), msg.sender);
    }

    // Fallback function to allow direct ETH transfers to the contract
    receive() external payable {
        depositETH();
    }
}
