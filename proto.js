String.prototype.markupToHtml = function(openToken, closeToken, openHtml, closeHtml)
{

if (openToken == closeToken) throw new Error("start and end format tokens cannot be identical");
// skip this and return unaltered string if markup is not present
if (this.indexOf(openToken)==-1) return this;
if (this.indexOf(closeToken)==-1) return this;


var matchRecursive = function () {
	var	formatParts = /^([\S\s]+?)\.\.\.([\S\s]+)/,
		metaChar = /[-[\]{}()*+?.\\^$|,]/g,
		escape = function (str) {
			return str.replace(metaChar, "\\$&");
		};

	return function (str, format) {
		var p = formatParts.exec(format);

		var	opener = p[1],
			closer = p[2],
			iterator = new RegExp(format.length == 5 ? "["+escape(opener+closer)+"]" : escape(opener)+"|"+escape(closer), "g"),
			results = [],
			openTokens, matchStartIndex, match;

		do {
			openTokens = 0;
			while (match = iterator.exec(str)) {
				if (match[0] == opener) {
					if (!openTokens)
						matchStartIndex = iterator.lastIndex;
					openTokens++;
				} else if (openTokens) {
					openTokens--;
					if (!openTokens)
						results.push(str.slice(matchStartIndex, match.index));
				}
			}
		} while (openTokens && (iterator.lastIndex = matchStartIndex));

		return results;
	};
}();

	var tokens = matchRecursive(this,openToken+'...'+closeToken);
	// return unaltered if not found
	if (tokens.length <= 0) return this;
	// return unaltered if number of openTokens doesnt match number of closeTokens, and v.v.
	if (tokens.length + 1 != this.split(openToken).length) return this; 
	if (tokens.length + 1 != this.split(closeToken).length) return this;
	news = '';
	var pos = 0;
	for (i=0; i < tokens.length; i++)
	{
		pos_new = this.indexOf(openToken+tokens[i]);
		news = news + this.substr(pos, pos_new - pos);
		pos = pos_new + openToken.length + closeToken.length + tokens[i].length;
		news = news + openHtml + tokens[i] + closeHtml;
	}
	news = news + this.substr(this.lastIndexOf(closeToken)+closeToken.length, this.length);
	return news;
}
