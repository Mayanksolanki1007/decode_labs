const supabase = require('../config/supabaseClient');

/**
 * TaskModel - Data access layer for `tasks` table in Supabase.
 */
const TaskModel = {
  /**
   * Retrieve all tasks from Supabase
   * @param {number} [userId] - Optional user ID filter
   * @returns {Promise<Array>} List of tasks
   */
  async getAll(userId = null) {
    let query = supabase.from('tasks').select('*').order('id', { ascending: true });
    
    if (userId) {
      query = query.eq('user_id', userId);
    }

    const { data, error } = await query;
    if (error) {
      throw new Error(`Database Error (getAllTasks): ${error.message}`);
    }
    return data || [];
  },

  /**
   * Retrieve a task by ID
   * @param {number} id - Task ID
   * @returns {Promise<Object|null>} Task object
   */
  async getById(id) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error(`Database Error (getTaskById): ${error.message}`);
    }
    return data;
  },

  /**
   * Create a new task in Supabase
   * @param {Object} taskData - { title, completed, userId }
   * @returns {Promise<Object>} Created task object
   */
  async create({ title, completed, userId }) {
    const payload = {
      title: title.trim(),
      completed: completed ?? false
    };
    
    if (userId) {
      payload.user_id = userId;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([payload])
      .select()
      .single();

    if (error) {
      throw new Error(`Database Error (createTask): ${error.message}`);
    }
    return data;
  },

  /**
   * Update an existing task in Supabase
   * @param {number} id - Task ID
   * @param {Object} updates - Fields to update
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
      throw new Error(`Database Error (updateTask): ${error.message}`);
    }
    return data;
  },

  /**
   * Delete a task from Supabase
   * @param {number} id - Task ID
   * @returns {Promise<boolean>} True if successful
   */
  async delete(id) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Database Error (deleteTask): ${error.message}`);
    }
    return true;
  }
};

module.exports = TaskModel;
