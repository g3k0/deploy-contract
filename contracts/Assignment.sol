//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Assignment {
  
  function attempt(address cont) public {
    (bool success, ) = cont.call(
      abi.encodeWithSignature("attempt()")
    );

    require(success);
  }

  // fallback function
  receive() external payable {
    revert("it was not possible to forward your request");
  }
}

