import '../constants';
import { methods, Endpoint, Parameter, Response } from '../constants';

export default Endpoint(
    {
        title: 'Criar Video',
        method: methods.POST,
        url: '/video/create',
        description: 'Endpoint de criar vídeo',
        useCases: [
            'Caso de uso 1',
            'Caso de uso 2'
        ],
        businessRoles: [
            'O e-mail passado precisa ser um e-mail válido',
            'A senha não pode ter menos de 8 caracteres'
        ],
        parameters: [
            Parameter({
                name: 'body',
                description: 'Corpo contendo as informações de cadastro',
                value: '{\n   "email": "user@test.com",\n   "name": "User Name"\n}'
            }),
        ],
        responses: [
            Response({
                code: '201',
                description: 'Created',
                value: '{\n   "email": "user@test.com",\n   "name": "User Name"\n}'
            })
        ]
    }
)