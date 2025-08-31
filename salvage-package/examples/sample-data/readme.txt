Sample Data Directory
===================

This directory contains sample files for testing the Salvage library examples.

You can create your own test files here, or the examples will work with any directory structure.

For comprehensive testing, consider creating:

1. Text files (.txt, .md, .json)
2. Document files (.pdf, .doc, .docx)
3. Image files (.jpg, .png, .gif)
4. Subdirectories with nested files
5. Hidden files (starting with .)
6. Empty files and directories
7. Large files (>1MB) for performance testing
8. Duplicate files with identical content

Example structure:
├── documents/
│   ├── report.pdf
│   ├── notes.txt
│   └── .hidden-config
├── images/
│   ├── photo1.jpg
│   └── photo2.png
├── data/
│   ├── data.json
│   ├── backup.zip
│   └── logs/
│       ├── app.log
│       └── error.log
├── duplicates/
│   ├── file1.txt
│   └── file1_copy.txt (same content as file1.txt)
└── temp/
    ├── empty.txt (0 bytes)
    └── large.bin (>1MB)

The examples will demonstrate various features based on the files present in this directory.