import crypto from "crypto";
import slugify from "slugify";

export const generateSlug = (name: string): string => {
    const token = crypto.randomInt(100, 10000).toString();
    return slugify(name + "-" + token, {
        replacement: "-",
        remove: /[*+~.()'"!:@,;?&%$#^{}<>]/g,
        lower: true,
        strict: false,
        locale: "vi",
        trim: true
    });
 
}

