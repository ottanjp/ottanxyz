import { dom, library } from '@fortawesome/fontawesome-svg-core'
import { faCalendar } from '@fortawesome/free-regular-svg-icons/faCalendar'
import { faClock } from '@fortawesome/free-regular-svg-icons/faClock'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons/faAngleLeft'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons/faAngleRight'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons/faFolderOpen'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons/faPencilAlt'
import { faRssSquare } from '@fortawesome/free-solid-svg-icons/faRssSquare'
import { faTag } from '@fortawesome/free-solid-svg-icons/faTag'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
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
	el: '#site-header',
	delimiters: ['[[', ']]'],
	data: {
		results: [],
		query: '',
		show: false,
	},
	created: function() {
		this.debouncedSearch = _.debounce(this.search, 500)
	},
	methods: {
		search: function() {
			if (this.query.length === 0) {
				this.results = []
				return
			}
			fetch(process.env.ELASTICSEARCH_URI + '?q=' + this.query, {
				mode: 'cors',
			})
				.then(response => {
					return response.json()
				})
				.then(results => {
					this.results = results
					this.show = true
				})
		},
	},
	watch: {
		query: function() {
			this.show = false
			this.debouncedSearch()
		},
	},
})

import '../scss/style.scss'
