const supabase = require('../config/supabaseClient');

/**
 * TaskModel - Handles all database CRUD operations with Supabase for the `tasks` table.
 */
const TaskModel = {
  /**
   * Retrieve all tasks from Supabase
   * @returns {Promise<Array>} List of task objects
   */
  async getAll() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      throw new Error(`Database Error (getAll): ${error.message}`);
    }
    return data || [];
  },

  /**
   * Retrieve a single task by ID from Supabase
   * @param {number} id - Task ID
   * @returns {Promise<Object|null>} Task object or null if not found
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database Error (getById): ${error.message}`);
    }
    return data;
  },

  /**
   * Insert a new task into Supabase
   * @param {Object} taskData - Task object containing title and completed status
   * @returns {Promise<Object>} Created task object
   */
  async create(taskData) {
    const { title, completed } = taskData;
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ title, completed: completed ?? false }])
      .select()
      .single();

    if (error) {
      throw new Error(`Database Error (create): ${error.message}`);
    }
    return data;
  },

  /**
   * Update an existing task in Supabase
   * @param {number} id - Task ID
   * @param {Object} updates - Fields to update (title, completed)
   * @returns {Promise<Object>} Updated task object
   */
  async update(id, updates) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Database Error (update): ${error.message}`);
    }
    return data;
  },

  /**
   * Delete a task from Supabase by ID
   * @param {number} id - Task ID
   * @returns {Promise<boolean>} True if deleted successfully
   */
  async delete(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Database Error (delete): ${error.message}`);
    }
    return true;
  }
};

module.exports = TaskModel;
