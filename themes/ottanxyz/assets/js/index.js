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
import { faGooglePlay } from '@fortawesome/free-brands-svg-icons/faGooglePlay'
import { faAppStoreIos } from '@fortawesome/free-brands-svg-icons/faAppStoreIos'
import { faChrome } from '@fortawesome/free-brands-svg-icons/faChrome'
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
	faGooglePlay,
	faAppStoreIos,
	faChrome,
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
		this.debouncedSearch = _.debounce(this.search, 200)
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
		close: function() {
			this.show = false
		}
	},
	watch: {
		query: function() {
			this.show = false
			this.debouncedSearch()
		},
	},
})

document.addEventListener('DOMContentLoaded', () => {

	// Get all "navbar-burger" elements
	const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

	// Check if there are any navbar burgers
	if ($navbarBurgers.length > 0) {

		// Add a click event on each of them
		$navbarBurgers.forEach( el => {
			el.addEventListener('click', () => {

				// Get the target from the "data-target" attribute
				const target = el.dataset.target
				const $target = document.getElementById(target)

				// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
				el.classList.toggle('is-active')
				$target.classList.toggle('is-active')

			})
		})
	}

})

import '../scss/style.scss'
