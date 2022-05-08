const AWS = require('aws-sdk');
const { request, response } = require('express');
const { validationResult } = require('express-validator');

const { timeSelection, random } = require('../../helpers/index.helpers');

const dynamoDbClient = new AWS.DynamoDB.DocumentClient();

const linkPost = async (req = request, res = response) => {
  const { information, time } = req.body;
  const errors = validationResult(req);
  const timeResult = await timeSelection(time);
  const expireAt = new Date(timeResult);
  const url = random(16);

  const params = {
    dataId: url,
    information,
    expireAt: timeResult,
  };

  try {
    if (!errors.isEmpty()) return res.status(400).json(errors);

    await dynamoDbClient.put({
      TableName: process.env.DATA_TABLE,
      Item: params,
    }).promise();

    return res.json({
      status: 'ok',
      information,
      dataId: url,
      expireAt,
      timeResult,
    });
  } catch (err) {
    res.status(400).json({ err });
  }

  return res.status(500).json({ message: 'return value' });
};

const linkGet = async (req = request, res = response) => {
  const params = {
    TableName: process.env.DATA_TABLE,
    Key: {
      dataId: req.params.dataId,
    },
  };
  const { Item } = await dynamoDbClient.get(params).promise();
  try {
    if (Item) {
      const { dataId, information } = Item;
      res.json({ dataId, information });
    } else {
      res
        .status(404)
        .json({ error: 'Could not find data with provided "dataId"' });
    }
  } catch (error) {
    res.json(error);
  }

  return res.json({
    Item,
  });
};

module.exports = {
  linkPost,
  linkGet,
};
