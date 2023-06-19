import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host.switchToHttp()
		const response = ctx.getResponse()
		const request = ctx.getRequest()
		let status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
		let message = exception.sqlMessage || exception.response || exception
		let error = exception.sqlState === 45000 ? 'Bad Request' : 'Bad Request'

		request.log.timeTookToServe = Date.now() - request.log.timestamp
		request.log.message = message
		request.log.status = `${status}`

		if (exception instanceof TypeError) {
			status = 400
			error = 'Bad Request'
			message = exception.message.substring(exception.message.indexOf('\n\n\n') + 1).trim()
		}

		if (status === 500) {
			console.log(exception.sqlMessage, exception.sqlState, exception)
		} else {
			console.log(exception.sqlMessage, exception.sqlState, exception)
		}

		response.status(status).json({
			status: exception.status || status,

			error: error,
			message: [status === 403 ? "Either you don't have the privilege or been logged out." : message],
		})
	}
}
