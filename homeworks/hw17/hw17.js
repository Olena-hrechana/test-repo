"use strict";

const getUserInfo = async () => {
    const response = await fetch("/api/for/user");
    const userInfo = await response.json();

    return userInfo;
};

async function retry (funcAsync, retriesObj) {
    try {
        return await funcAsync()
    } catch (error) {
        if (retriesObj.retries > 0) {
            const obj = {retries : retriesObj.retries-1};
            return await retry(funcAsync, obj);
        } else {
            throw new error;
        }
    }
}

retry(getUserInfo, { retries: 3 });
