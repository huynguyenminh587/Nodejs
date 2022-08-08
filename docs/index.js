const swaggerTools = require('swagger-tools');
const jsYaml = require('js-yaml');
const path = require('path')

class SwaggerIndex {
    constructor(app, fs) {
        this.app = app
        this.fs = fs
    }

    /**
     * @description SwaggerRouter configuration && Initialize the Swagger middleware
     */
    getSwaggerTools() {
        const swaggerUi = path.join(__dirname, 'swagger_api_doc.json');
        const optionsSwagger = {
            swaggerUi,
            useStubs: process.env.NODE_ENV === 'development', // Conditionally turn on stubs (mock mode)
        }
        const spec = this.fs.readFileSync(swaggerUi, 'utf8');// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
        const swaggerDoc = jsYaml.safeLoad(spec)
        swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
            this.app.use(middleware.swaggerMetadata());// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
            this.app.use(middleware.swaggerValidator());// Validate Swagger requests
            this.app.use(middleware.swaggerRouter(optionsSwagger));// Route validated requests to appropriate controller
            this.app.use(middleware.swaggerUi());// Serve the Swagger documents and Swagger UI
        });
    }
}
module.exports = (app, fs) => {
    return new SwaggerIndex(app, fs)
}
