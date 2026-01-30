// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract IdentityRoot {
    address private builder;
    bool private builderSet;

    event BuilderSet(address indexed builder);

    modifier onlyUnset() {
        require(!builderSet, "Builder already set");
        _;
    }

    function setBuilder(address _builder) external onlyUnset {
        builder = _builder;
        builderSet = true;
        emit BuilderSet(_builder);
    }

    function getBuilder() external view returns (address) {
        return builder;
    }

    function isBuilder(address _addr) external view returns (bool) {
        return _addr == builder;
    }
}
