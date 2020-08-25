import '../constants';
import { methods, Endpoint, Parameter, Response } from '../constants';

export default Endpoint(
    {
        title: 'Cadastro',
        method: methods.POST,
        url: '/register/',
        description: 'Endpoint de cadastrar usuário',
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
                name: 'Body',
                description: '',
                value: '{"email": "user@test.com", "name": "User Name"}'
            })
        ],
        responses: [
            Response({
                code: '201',
                description: 'Created',
                value: '{"email": "user@test.com", "name": "User Name"}'
            })
        ]
    }
)