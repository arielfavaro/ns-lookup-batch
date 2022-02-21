const { Resolver } = require('dns').promises;
const fs = require('fs');

const { domains } = require('../data/domains');

const resolver = new Resolver();
resolver.setServers(['8.8.8.8', '1.1.1.1']);

(async () => {
    let resolvedDomains = {};

    for await (const domain of domains) {
        const ns = await resolver.resolveNs(domain);
        const mx = await resolver.resolveMx(domain);

        // console.log(domain, ns);

        resolvedDomains = {
            ...resolvedDomains, [domain]: {
                ns: ns, mx: mx
            }
        };
    }

    console.log(resolvedDomains);

    fs.writeFileSync('./output/resolved-domains.json', JSON.stringify(resolvedDomains, null, "   "));

})();
