import { OpenAPIV3 } from 'openapi-types';
import patternSchema from './paths';

const swaggerDocument: OpenAPIV3.Document = {
  openapi: '3.0.0',
  info: {
    title: 'API do projeto XPTO',
    description: 'Documentação',
    contact: {
      email: 'michel.guega@polijunior.com.br',
    },
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:3030/',
      description: 'Local server',
    },
    {
      url: 'https://sua-url.com/',
      description: 'Deployed server',
    },
  ],
  paths: patternSchema,
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

export default swaggerDocument;
