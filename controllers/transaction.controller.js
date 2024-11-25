const { response } = require('express');
const Transaction = require('../models/transaction.model');

/**
 * @desc   Get all transactions
 * @route  POST /transactions 
 * @access Public 
 */

exports.findAll = async(req, res, next) => {
  //res.send('GET all Transactions')
  try {
    const transactions = await Transaction.find()

    return res.status(200).json({
      success: true,
      count: transactions.length,
      data: transactions
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
    
  }
}

/**
 * @desc   Add transaction
 * @route  POST /transactions 
 * @access Public 
 */

exports.create = async( req, res, next) => {
  //res.send('POST single transaction')
  try {
    const { text, amount } = req.body

    const transaction = await Transaction.create(req.body)

    return res.status(201).json({
      success: true,
      data: transaction
    })
  } catch (error) {
    //console.log(error)
    if( error.name === 'ValidationError' ){
      const messages =  Object.values(error.errors).map(val => val.message)
      return res.status(400).json({
        success:false,
        error: messages
      })
    }else{
      return res.status(500).json({
        success: false,
        error: 'Server Error'
      })
    }
  }
}

/**
 * @desc   Delete transaction
 * @route  DELETE /transactions/:id 
 * @access Public 
 */
exports.delete = async (req, res, next) => {
  //res.send('DELETE a single transaction')
  try {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction){
      return res.status(404).json({
        success: false,
        error: 'No transaction were found'
      })
    }
    
    await transaction.remove()

    return res.status(200).json({
      success: true,
      data: {}
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    })
  }
}