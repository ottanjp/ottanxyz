import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons'
import {
	faAngleLeft,
	faAngleRight,
	faFolderOpen,
	faPencilAlt,
	faRssSquare,
	faTag,
} from '@fortawesome/free-solid-svg-icons'
import {
	faFacebook,
	faTwitter,
	faGithub,
} from '@fortawesome/free-brands-svg-icons'
library.add(
	faCalendar,
	faClock,
	faAngleLeft,
	faAngleRight,
	faFolderOpen,
	faPencilAlt,
	faRssSquare,
	faTag,
	faFacebook,
	faTwitter,
	faGithub,
)
dom.i2svg()

import Vue from 'vue'
import _ from 'lodash'

new Vue({
	el: '#search',
	delimiters: ['[[', ']]'],
	data: {
		results: [],
		query: '',
	},
	created: function() {
		this.debouncedSearch = _.debounce(this.search, 1000)
	},
	methods: {
		search: function() {
			if (this.query.length === 0) return []
			fetch(process.env.ELASTICSEARCH_URI + '?q=' + this.query, {
				mode: 'cors',
			})
				.then(response => {
					return response.json()
				})
				.then(results => {
					this.results = results
				})
		},
	},
	watch: {
		query: function() {
			this.debouncedSearch()
		},
	},
})

import '../scss/style.scss'
