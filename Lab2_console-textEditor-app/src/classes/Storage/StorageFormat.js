class StorageFormat {
  save(document, path) {
    throw new Error("Method 'save' must be implemented");
  }
}

module.exports = StorageFormat;
