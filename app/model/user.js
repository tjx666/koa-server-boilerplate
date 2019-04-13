const User = {
    openId: {
        unique: true,
        type: String,
    },
    wxNumber: {
        type: String,
        unique: true,
    },
    idNumber: {
        type: String,
    },
    name: {
        type: String,
    },
    area: {
        type: String,
    },
    phone: {
        type: String,
    },
    ticketsId: {
        type: [String],
        default: [],
    }
};

module.exports = User;