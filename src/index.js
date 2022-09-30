const { Resolver } = require('dns').promises;
const fs = require('fs');

const { domains } = require('../data/domains');

const resolver = new Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

(async () => {
    let resolvedDomains = {};

    for await (const domain of domains) {

        try {
            const resolved = await resolver.resolveAny(domain);

            resolvedDomains = {
                ...resolvedDomains, [domain]: [...resolved],
            };
        } catch (error) {
            console.error(error);
        }
    }

    console.log(resolvedDomains);

    fs.writeFileSync('./output/resolved-domains.json', JSON.stringify(resolvedDomains, null, "   "));

})();
