'use strict';

const Candidate = {
    id: {
        unique: true,
        type: String,
    },
    name: {
        type: String,
        maxLength: 8,
        default: '姓名缺失'
    },
    age: {
        type: Number,
        min: -1,
        max: 150,
    },
    acquiredCount: {
        type: Number,
        min: 0,
        default: 0
    },
    photoSrc: {
        type: String,
    },
};

module.exports = Candidate;