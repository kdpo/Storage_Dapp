pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

contract Crud {
    struct File {
        uint id;
        string name;
        string content;
        uint timestamp;
        address owner;
        uint note;
    }

    File[] public files;
    uint public nextId = 1;

    // Create new file
    function create(string memory name, string memory content, address owner) public {
        files.push(File(nextId, name, content, now, owner, 1));
        nextId++;
    }

    // Read files data passing file id
    function read(uint id) view public returns(uint, string memory, string memory, uint, address, uint) {
        uint i = find(id);
        return(files[i].id, files[i].name, files[i].content, files[i].timestamp, files[i].owner, files[i].note);
    }

    // Update file
    function update(uint id, string memory name, string memory content, address user) public {
        uint i = find(id);
        address owner = files[i].owner;

        if (owner == user) {
            files[i].note = 2;
        }

        else {
            files[i].note = 3;
        }

        files[i].name = name;
        files[i].content = content;
        files[i].timestamp = now;
    }

    // Delete file
    function destroy(uint id) public {
        uint i = find(id);
        delete files[i];
    }

    // Find file
    function find(uint id) view internal returns(uint) {
        for(uint i = 0; i < files.length; i++) {
            if(files[i].id == id) {
                return i;
            }
        }
        revert('File does not exist!');
    }

    // Return a list of all files
    function allFiles() view public returns(uint[] memory, string[] memory, string[] memory, uint[] memory, address[] memory, uint[] memory) {
        uint[] memory ids = new uint[](files.length);
        string[] memory titles = new string[](files.length);
        string[] memory contents = new string[](files.length);
        uint[] memory timestamps = new uint[](files.length);
        address[] memory owners = new address[](files.length);
        uint[] memory notes = new uint[](files.length);

        for(uint i = 0; i < files.length; i++) {
                ids[i] = files[i].id;
                titles[i] = files[i].name;
                contents[i] = files[i].content;
                timestamps[i] = files[i].timestamp;
                owners[i] = files[i].owner;
                notes[i] = files[i].note;
        }
        return(ids, titles, contents, timestamps, owners, notes);
    }
}