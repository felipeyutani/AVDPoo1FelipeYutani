const { response, request } = require('express')
const express = require('express')
const aplicacao = express()
aplicacao.use(express.json())

aplicacao.listen(3333, () => {
    console.log('Servidor Rodando')
})

aplicacao.use((request, response, next) => {
    console.log(`Metodo: ${request.method}, URL: ${request.url}`)
    return next()
})

const checarId = (request, response, next) => {
    const { indice } = request.params
    if (!materia[indice]) {
        return response
                .status(400)
                .json({ error: 'Não existe data da prova com este id.'})
    }
    return next()
}

const checarArray = (request, response, next) => {
    const { indice } = request.params
    if(!request.body.dia_sem 
        || !request.body.data_avd 
        || !request.body.disciplina 
        || !request.body.horario 
        || !request.body.professor) {
        return response.status(400).json({error: 'O campo dia da semana ou data da avd ou disciplina ou horário ou professor não existe no corpo da requisição.'})
    }
    return next()
}

const checarProfessor = (request, response, next) => {
    const { indice } = request.params
    if (!request.body.professor) {
        return response
                .status(400)
                .json({ error: 'Não existe data da avd para este professor.'})
    }
    return next()
}

const checarDataAVD = (request, response, next) => {
    const { indice } = request.params
    if (!request.body.disciplina) {
        return response
                .status(400)
                .json({ error: 'Não existe data da avd para esta disciplina.'})
    }
    return next()
}

// letra A
const materia = [
    { id: 7654, dia_sem: 'sexta', data_avd: 16, disciplina: 'Programação Orientada a objetos I', horario: '19:00', professor: 'Thiaguinho'},
    { id: 7653, dia_sem: 'quinta', data_avd: 8, disciplina: 'Linguagem de Programação para Web II', horario: '20:30', professor: 'Thiaguinho'}
]

// letra B
// localhost:3333/materia
// Listar todas as datas das provas
aplicacao.get('/materia', (request, response) => {
    return response.json(materia)
})

// letra C
//localhost:3333/materia/0
// Listar a data de prova pelo id
aplicacao.get('/materia/:indice', checarId, (request, response) => {
    const { indice } = request.params
    return response.json(materia[indice])
})

// Letra D
// Incluir a data de prova no array
// localhost:3333/materia
aplicacao.post('/materia', checarArray, (request, response) => {
    const { dia_sem, data_avd, disciplina, horario, professor } = request.body
    const materias = {
        dia_sem,
        data_avd,
        disciplina,
        horario,
        professor
    }
    materia.push(materias)
    return response.json(materia)
})

// Letra E
// Alterar a data de prova
// localhost:3333/materia/0
aplicacao.put('/materia/:indice', checarId, (request, response) => {
    const { indice } = request.params
    const { dia_sem, data_avd, disciplina, horario, professor } = request.body
    const materias = {
        dia_sem,
        data_avd,
        disciplina,
        horario,
        professor
    }
    materia.push(materias)
    materia[indice] = dia_sem, data_avd, disciplina, horario, professor
    return response.json(materia)
})

// Letra F
// Excluir data de prova pelo id
// localhost:3333/materia/0
aplicacao.delete('/materia/:indice', (request, response) => {
    const { indice } = request.params
    materia.splice( indice, 1 )
    return response.json(materia)
})

// Letra G
aplicacao.get('/materia', checarProfessor, (request, response) => {
    const { professor } = request.query.body
    if (professor == request.body.professor) {
        return response.json(materia[indice])
    }
})

// Letra H
aplicacao.get('/materia', checarDataAVD, (request, response) => {
    const { disciplina } = request.query.body
    if (disciplina == request.body.disciplina) {
        return response.json(materia[indice])
    }
})