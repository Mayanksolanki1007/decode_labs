const supabase = require('../config/supabaseClient');

/**
 * UserModel - Database abstraction layer for `users` table in Supabase.
 */
const UserModel = {
  /**
   * Find user by email address
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object including password_hash, or null
   */
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase().trim())
      .maybeSingle();

    if (error) {
      throw new Error(`Database Error (findByEmail): ${error.message}`);
    }
    return data;
  },

  /**
   * Find user by primary key ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} User profile object excluding password_hash
   */
  async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, name, email, created_at')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database Error (findById): ${error.message}`);
    }
    return data;
  },

  /**
   * Create and register a new user in Supabase
   * @param {Object} userData - User information ({ name, email, passwordHash })
   * @returns {Promise<Object>} Created user record (without password_hash)
   */
  async create({ name, email, passwordHash }) {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password_hash: passwordHash
      }])
      .select('id, name, email, created_at')
      .single();

    if (error) {
      throw new Error(`Database Error (createUser): ${error.message}`);
    }
    return data;
  }
};

module.exports = UserModel;
