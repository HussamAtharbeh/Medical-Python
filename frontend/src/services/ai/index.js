import * as mock from './mockAi';
import * as remote from './remoteAi';

const ai = import.meta.env.VITE_AI_MODE === 'remote' ? remote : mock;

export default ai;
