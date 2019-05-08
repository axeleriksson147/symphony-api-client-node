const https = require('https')
const FormData = require('form-data')
const Q = require('kew')
const { agentRequest } = require('../Request/clients')
const SymConfigLoader = require('../SymConfigLoader')
const SymBotAuth = require('../SymBotAuth')

const MessagesClient = {}

MessagesClient.PRESENTATIONML_FORMAT = 'presentationML'
MessagesClient.MESSAGEML_FORMAT = 'messageML'

MessagesClient.sendMessage = (conversationId, message, data, format) => {
  if (format === MessagesClient.PRESENTATIONML_FORMAT) {
    message = '<div data-format="PresentationML" data-version="2.0">' + message + '</div>'
    return send(conversationId, message, data)
  } else if (format === MessagesClient.MESSAGEML_FORMAT) {
    message = '<messageML>' + message + '</messageML>'
    return send(conversationId, message, data)
  }
}

MessagesClient.sendMessageWithAttachment = (conversationId, message, data, fileName, fileType, fileContent, format) => {
  if (format === MessagesClient.PRESENTATIONML_FORMAT) {
    message = '<div data-format="PresentationML" data-version="2.0">' + message + '</div>'
    return send(conversationId, message, data, fileName, fileType, fileContent)
  } else if (format === MessagesClient.MESSAGEML_FORMAT) {
    message = '<messageML>' + message + '</messageML>'
    return send(conversationId, message, data, fileName, fileType, fileContent)
  }
}

MessagesClient.forwardMessage = (conversationId, message, data) => {
  return send(conversationId, message, data)
}

MessagesClient.getAttachment = (streamId, attachmentId, messageId) => {
  const defer = Q.defer()

  const options = {
    hostname: SymConfigLoader.SymConfig.agentHost,
    port: SymConfigLoader.SymConfig.agentPort,
    path: `/agent/v1/stream/${streamId}/attachment?messageId=${messageId}&fileId=${attachmentId}`,
    method: 'GET',
    headers: {
      sessionToken: SymBotAuth.sessionAuthToken,
      keyManagerToken: SymBotAuth.kmAuthToken
    },
    agent: SymConfigLoader.SymConfig.agentProxy
  }

  const req = https.request(options, function (res) {
    let str = ''
    res.on('data', function (chunk) {
      str += chunk
    })
    res.on('end', function () {
      if (SymBotAuth.debug) {
        console.log('[DEBUG]', 'MessagesClient/getAttachment/str', str)
      }
      defer.resolve(Buffer.from(str, 'base64'))
    })
  })

  req.end()

  return defer.promise
}

MessagesClient.getMessage = messageId =>
  agentRequest('get', `/agent/v1/message/${messageId}`, 'MessagesClient/getMessage')

/* Generic function to send/forward messages from MessagesClient interface */
var send = (conversationId, message, data, fileName, fileType, fileContent) => {
  const form = new FormData()
  form.append('message', message)
  if (data != null) {
    form.append('data', data)
  }

  if (fileName != null) {
    form.append('attachment', fileContent, {
      filename: fileName,
      contentType: fileType,
      knownLength: fileContent.length
    })
  }

  return agentRequest(
    'post',
    `/agent/v4/stream/${conversationId}/message/create`,
    'MessagesClient/sendMessage',
    form
  )
}

module.exports = MessagesClient
