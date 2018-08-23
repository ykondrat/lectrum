// Core
import { getFullApiUrl } from 'instruments';

const GROUP_ID = 'jsI6y4FGJ7LM';
const TOKEN = '3wosowd0iy';

const SOCKET_URL = 'https://lab.lectrum.io';
const ROOT_URL = 'https://lab.lectrum.io/react/api';
const MAIN_URL = getFullApiUrl(ROOT_URL, GROUP_ID);

export { GROUP_ID, TOKEN, MAIN_URL, SOCKET_URL, ROOT_URL };
