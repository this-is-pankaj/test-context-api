const { getSessionStatus } = require('./components/session.component');
const { getAllMediaForSession, getMediaContextForSession, getContext } = require('./components/media.component');

module.exports = async (req, res) => {
  try {
    const { sessionId } = req.params;
    // Fetch the session status. If found proceed to next step
    const sessionInfo = await getSessionStatus(sessionId);
    const sessionMedias = await getAllMediaForSession(sessionId);
    const mediaContext = await getMediaContextForSession(sessionId);

    // Loop over all the sessionMedia and create an object to be traversed
    const mediaFromSession = sessionMedias.reduce((obj, elem) => {
      obj[elem.id] = elem;
      return obj;
    }, {});

    // Loop over the medias found with contexts
    sessionInfo.media = {
      front: [],
      back: [],
      none: [],
    };

    mediaContext.forEach(({...m}) => {
      // Check if media is valid and assign it respectively
      const { mediaId, context, probability } = m;
      // Check if media is valid
      if (mediaFromSession[mediaId]) {
        // Check the context
        m.context = getContext(mediaFromSession[mediaId].context);
        sessionInfo.media[m.context].push(m);
      }
    });
    // Sort the array 
    for (let type in sessionInfo.media) {
      sessionInfo.media[type] = sessionInfo.media[type].sort((a, b) => {
        // Descending order
        return  b.probability - a.probability;
      });
    }
    console.log(req.reqId, sessionInfo);
    return res.status(200).send(sessionInfo);
  } catch (error: any) {
    console.error(req.reqId, { error, status: error.response?.status || 500 });
    return res.status(error.response?.status || 500).json({ message: error.response?.data || 'Internal server error' });
  }
};