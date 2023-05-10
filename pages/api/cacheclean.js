const cache = require('memory-cache');
export default function handler(req, res) {
    const queryParams = req.query.route;
    if (queryParams) {
        if (queryParams == "all") {
            cache.clear();
            res.status(200).json({ msg: "All cache clean sucessfully" });
            return;
        }
        else {
            const myKeyExists = cache.get(`${queryParams}`) !== null
            if (myKeyExists) {
                cache.del(`${queryParams}`);
                res.status(200).json({ msg: `${queryParams} cache clean sucessfully` });
                return;
            } else {
                res.status(200).json({ msg: `Cache entry does not exist.` });
                return;
            }
        }
    }
    res.status(401).json({ msg: "Unauthorised access" });
    return;
}