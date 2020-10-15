const express = require('express');
const bcrypt = require('bcryptjs');
const { pool } = require('../db/connect');
const {
  isInvalidField
} = require('../utils/common');
const authMiddleware = require('../middleware/auth');
const Router = express.Router();
const _ = require('lodash');

//todo
Router.post('/addnewtask', authMiddleware, async (req, res) => {
  try {
    const { taskName, taskDueDatetime, taskDescription, taskPriority, taskMemberId, createdBy } = req.body;
    const validFieldsToUpdate = [
      'taskName',
      'taskDueDatetime',
      'taskPriority',
      'taskMemberId',
      'taskDescription',
      'createdBy'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        addtask_error: 'Invalid field.'
      });
    }

    const memberid = Number(taskMemberId);
    const result = await pool.query(
        'select first_name, last_name from erp_user where user_id=$1',
        [memberid]//todo
    );
    const memberName = result.rows[0].first_name + " " + result.rows[0].last_name;
    dueDateTime = null;
    if(!_.isEmpty(taskDueDatetime)){ dueDateTime = new Date(taskDueDatetime);}
    // const dueDateTime = new Date(taskDueDatetime);
    // const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      'insert into task(task_name, task_due_datetime, task_description, task_priority, task_progress, task_comment, task_member_id, task_member, is_approved, created_by, created_datetime) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,CURRENT_TIMESTAMP)',
      [taskName, dueDateTime, taskDescription, taskPriority, 0, "", memberid, memberName, false, createdBy]//todo
    );
    // console.log(task_name);
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      addtask_error: 'Error while adding task...Try again later.'
    });
  }
});

Router.get('/gettasksbyuser', authMiddleware, async (req, res) => {
    try {
      const value = Number(req.query.user_id);
      const result = await pool.query(
        'select task_id, task_name, task_due_datetime, task_description, task_priority, task_progress, task_comment, task_member_id, task_member, is_approved, approved_by from task where task_member_id=$1 order by task_due_datetime',
        [value]
      );
      res.send(result.rows); //201 meaning?
    } catch (error) {
      res.status(400).send({
        gettasks_error: 'Error while retrieving tasks...Try again later.'
      });
    }
});

Router.get('/getalltasks', authMiddleware, async (req, res) => {
    try {
    //   const value = Number(req.query.user_id);
  
      const todoTasks = await pool.query(
        'select task_id, task_name, task_due_datetime, task_description, task_priority, task_progress, task_comment, task_member_id, task_member from task where is_approved=$1 and task_progress=$2 order by task_due_datetime',
        [false, 0] //todo: how to search approved tasks???
      );

      const doingTasks = await pool.query(
        'select task_id, task_name, task_due_datetime, task_description, task_priority, task_progress, task_comment, task_member_id, task_member from task where is_approved=$1 and task_progress>$2 and task_progress<$3 order by task_due_datetime',
        [false, 0, 100] //todo: how to search approved tasks???
      );

      const doneTasks = await pool.query(
        'select task_id, task_name, task_due_datetime, task_description, task_priority, task_progress, task_comment, task_member_id, task_member from task where is_approved=$1 and task_progress=$2 order by task_due_datetime',
        [false, 100] //todo: how to search approved tasks???
      );

      // const testDateTime = new Date(doingTasks.rows[0].task_due_datetime.getTime() - (doingTasks.rows[0].task_due_datetime.getTimezoneOffset() * 60000 )).toISOString();
      // const testd = testDateTime.split("T")[0];
      // const testt = testDateTime.slice(11,16);
      // const test = testd + " " + testt;

      const allTasks = [todoTasks.rows, doingTasks.rows, doneTasks.rows];

      res.send(allTasks);
    } catch (error) {
      res.status(400).send({
        getalltasks_error: 'Error while retrieving all tasks...Try again later.'
      });
    }
});

//todo
Router.post('/updatetask', authMiddleware, async (req, res) => {
  try {
    const { taskId, taskName, taskDueDatetime, taskDescription, taskPriority, taskProgress, taskMemberId, updatedBy, taskComment } = req.body;
    const validFieldsToUpdate = [
      'taskId',
      'taskName',
      'taskDueDatetime',
      'taskPriority',
      'taskProgress',
      'taskMemberId',
      'taskDescription',
      'taskComment',
      'updatedBy'
    ];
    const receivedFields = Object.keys(req.body);

    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        updatetask_error: 'Invalid field.'
      });
    }

    const memberid = Number(taskMemberId);
    const result = await pool.query(
        'select first_name, last_name from erp_user where user_id=$1',
        [memberid]//todo
    );
    const memberName = result.rows[0].first_name + " " + result.rows[0].last_name;
    dueDateTime = null;
    if(!_.isEmpty(taskDueDatetime)){ dueDateTime = new Date(taskDueDatetime);}
    // const dueDateTime = new Date(taskDueDatetime);
    // const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      'update task set task_name=$1, task_due_datetime=$2, task_description=$3, task_priority=$4, task_progress=$5, task_comment=$6, task_member_id=$7, task_member=$8, is_approved=$9, updated_by=$10, updated_datetime=CURRENT_TIMESTAMP where task_id=$11',
      [taskName, dueDateTime, taskDescription, taskPriority, Number(taskProgress), taskComment, memberid, memberName, false, updatedBy, Number(taskId)]//todo
    );
    // console.log(task_name);
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      updatetask_error: 'Error while updating task...Try again later.'
    });
  }
});

Router.post('/approvefinishedtask', authMiddleware, async (req, res) => {
  try {
    const { taskId, updatedBy } = req.body;
    const validFieldsToUpdate = [
      'taskId',
      'updatedBy'
    ];
    const receivedFields = Object.keys(req.body);
    const isInvalidFieldProvided = isInvalidField(
      receivedFields,
      validFieldsToUpdate
    );

    if (isInvalidFieldProvided) {
      return res.status(400).send({
        updatetask_error: 'Invalid field.'
      });
    }

    // const memberid = Number(taskMemberId);
    // const result = await pool.query(
    //     'select first_name, last_name from erp_user where user_id=$1',
    //     [memberid]//todo
    // );
    // const memberName = result.rows[0].first_name + " " + result.rows[0].last_name;
    // dueDateTime = null;
    // if(!_.isEmpty(taskDueDatetime)){ dueDateTime = new Date(taskDueDatetime);}
    // const dueDateTime = new Date(taskDueDatetime);
    // const hashedPassword = await bcrypt.hash(password, 8);
    await pool.query(
      'update task set is_approved=$1, approved_by=$2, approved_datetime=CURRENT_TIMESTAMP where task_id=$3',
      [true, updatedBy, Number(taskId)]
    );
    res.status(201).send();
  } catch (error) {
    res.status(400).send({
      updatetask_error: 'Error while approving task...Try again later.'
    });
  }
});
module.exports = Router;