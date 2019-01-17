import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import {
	faAngleLeft,
	faAngleRight,
	faFolderOpen,
	faPencilAlt,
	faRssSquare,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import {
	faFacebook,
	faTwitter,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
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
);
dom.i2svg();
