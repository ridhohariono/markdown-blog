const mongoose = require('mongoose')
const marked = require('marked')
// Untuk slug
const slugify = require('slugify')
// end lib slug

// lib xss Validation
// const createdDomPurify = require('dompurify')
// const { JSDOM } = require('jsdom')
// const dompurify = createdDomPurify(new JSDOM().window)
// End lib xss

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    markdown: {
        type: String,
        required: true,
    },
    creatdAt: {
        type: Date,
        default: Date.now
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    // sanitizedHtml: {
    //     type: String,
    //     required: true
    // }
})

// Untuk validasi
articleSchema.pre('validate', function (next) {
    if (this.title) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true
        })
    }
    // if (this.markdown) {
    //     this.sanitizedHtml = dompurify.sanitize(marked(this.markdown))
    // }
    next()
})

module.exports = mongoose.model('Article', articleSchema)