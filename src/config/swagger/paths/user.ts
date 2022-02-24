import { OpenAPIV3 } from 'openapi-types';

import UserComponent from '../schemas/user';
import PiuComponent from '../schemas/piu';
import PiuLikesComponent from '../schemas/piuLikes';

const userSchema: OpenAPIV3.PathsObject = {
  '/listar-followings': {
    post: {
      summary: 'Listar usuários os quais o username segue',
      description: 'Listar usuários os quais o username segue',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'E-mail already used',
        },
        405: {
          description: 'Username already used',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: UserComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/listar-followers': {
    post: {
      summary: 'Listar usuários',
      description:
        'Listar usuários os quais seguem o username/pessoa que fez o request',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'E-mail already used',
        },
        405: {
          description: 'Username already used',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: UserComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/listar-usuarios': {
    get: {
      summary: 'Listar usuários',
      description: 'Listar usuários',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          name: 'username',
          in: 'query',
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'E-mail already used',
        },
        405: {
          description: 'Username already used',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  properties: UserComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/follow': {
    patch: {
      summary: 'O usuário logado irá seguir o follower_name',
      description: 'O usuário logado irá seguir o follower_name',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                following_name: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        405: {
          description: "Can't follow yourself",
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'boolean',
              },
            },
          },
        },
      },
    },
  },
  '/login': {
    post: {
      summary: 'Login',
      description: 'Login',
      tags: ['User'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        405: {
          description: 'Incorrect password',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  token: {
                    type: 'string',
                  },
                  ...UserComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/register': {
    post: {
      summary: 'Registrar usuário',
      description: 'Registrar usuário',
      tags: ['User'],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                username: {
                  type: 'string',
                },
                name: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
                birthday_date: {
                  type: 'string',
                },
                email: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'E-mail already used',
        },
        405: {
          description: 'Username already used',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ...UserComponent,
                },
              },
            },
          },
        },
      },
    },
  },
  '/profile': {
    get: {
      summary: 'Regastar informações do usuário logado',
      description: 'Regastar informações do usuário logado',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        401: {
          description: 'Unauthorized',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  ...UserComponent,
                  pius: {
                    type: 'array',
                    items: {
                      properties: {
                        ...PiuComponent,
                        likes: {
                          type: 'array',
                          items: {
                            properties: PiuLikesComponent,
                          },
                        },
                      },
                    },
                  },
                  likes: {
                    type: 'array',
                    items: {
                      properties: PiuComponent,
                    },
                  },
                  favoritos: {
                    type: 'array',
                    items: {
                      properties: PiuComponent,
                    },
                  },
                  following: {
                    type: 'array',
                    items: {
                      properties: UserComponent,
                    },
                  },
                  followers: {
                    type: 'array',
                    items: {
                      properties: UserComponent,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  '/profile/update-photo': {
    patch: {
      summary: 'Alterar foto do usuário logado',
      description: 'Alterar foto do usuário logado',
      tags: ['User'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: {
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              properties: {
                file: {
                  type: 'string',
                  format: 'binary',
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: 'Unauthorized',
        },
        404: {
          description: 'User not found',
        },
        200: {
          description: 'OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: UserComponent,
              },
            },
          },
        },
      },
    },
  },
};

export default userSchema;
