import { dom, library } from '@fortawesome/fontawesome-svg-core';
import { faCalendar, faClock } from '@fortawesome/free-regular-svg-icons';
import {
	faAngleLeft,
	faAngleRight,
	faFolderOpen,
	faPencilAlt,
	faTag,
} from '@fortawesome/free-solid-svg-icons';
import {
	faFacebook,
	faTwitter,
	faGitHub,
	faRssSquare,
} from '@fortawesome/free-brands-svg-icons';
library.add(
	faCalendar,
	faClock,
	faAngleLeft,
	faAngleRight,
	faFolderOpen,
	faPencilAlt,
	faTag,
	faFacebook,
	faTwitter,
	faGithub,
	faRsssquare,
);
dom.i2svg();
