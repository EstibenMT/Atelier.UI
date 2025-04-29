
function generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function getSessionId() {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        sessionId = generateSessionId();
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
}
