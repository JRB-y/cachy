const { existsSync, writeFileSync, readFileSync, unlinkSync } = require('fs')

module.exports = {
  path: '',
  data: {},
  force: false,

  /**
   * Initialize the cache file.
   * @param {Object} options cache configuration
   * @return void
   */
  init (options = {}) {
    let { path, force } = options

    if (!path) {
      throw new Error(`Path is required`)
    }

    this.path = path || this.path
    this.force = force || false

    if (!existsSync(this.path) || this.force) {
      console.info(`Creating new file ${this.path} with force ${this.force}`)
      writeFileSync(this.path, '')
      this.data = this.loadDataAsJson()
    }

    return this
  },

  add(key, value) {
    this.data[key] = value
    return this
  },

  /**
   * If no key passed we delete all the cache object
   * @param {String} key
   */
  unset(key) {
    if (key) delete this.data[key]
    else this.data = {}
    return this
  },

  /**
   * If no key we return all the data object else we return only the key.
   * @param {String} key 
   */
  get (key = null) {
    key ? this.data[key] : this.data
  },

  /**
   * Save the data object in the file.
   * @returns
   */
  save () {
    try {
      writeFileSync(this.path, JSON.stringify(this.data))
      return this
    } catch (error) {
      console.error(error)
      return false
    }
  },

  /**
   * Load the data from the file and return it as JSON.
   * @returns {Object} content
   */
  loadDataAsJson () {
    try {
      if (!existsSync(this.path)) {
        throw new Error(`No file in path ${this.path}`)
      }
      const buffer = readFileSync(this.path)
      return JSON.parse(buffer.toString() === '' ? '{}' : buffer)
    } catch (error) {
      console.error('Error', error)
      return false
    }
  },

  /**
   * Unlink the file
   */
  unlink () {
    unlinkSync(this.path)
  }

}
