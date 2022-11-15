// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BuildWeb3Token is ERC20 {
    constructor(uint256 initialSupply) ERC20("Build Web3", "BuildWEB3") {
        _mint(msg.sender, initialSupply);
    }

    function mint() public {
        _mint(msg.sender, 1000 * 10**4 * 10**18);
    }
}
