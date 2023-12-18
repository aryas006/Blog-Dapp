// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Blog {
    address public owner;
    mapping(uint256 => Post) public posts;
    uint public postCount;

    struct Post {
        string title;
        string content;
        address author;
    }

    event PostCreated(uint256 postId, string title, address author);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createPost(string memory _title, string memory _content) public {
        postCount++;
        posts[postCount] = Post(_title, _content, msg.sender);
        emit PostCreated(postCount, _title, msg.sender);
    }
    function viewPostsCount() public  view  returns(uint _postCount ){
        _postCount = postCount;
        return _postCount;
    }
    function getPost(uint256 postId) public view returns (string memory title, string memory content, address author) {
        require(postId > 0 && postId <= postCount, "Invalid post ID");
        Post storage post = posts[postId];
        return (post.title, post.content, post.author);
    }

    function getAllPosts() public view returns (Post[] memory) {
        Post[] memory allPosts = new Post[](postCount);
        for (uint256 i = 1; i <= postCount; i++) {
            allPosts[i - 1] = posts[i];
        }
        return allPosts;
    }
}
