(this["webpackJsonpreact-firebase-authentication"]=this["webpackJsonpreact-firebase-authentication"]||[]).push([[341],{407:function(a,e){!function(a){var e={pattern:/\\[\\(){}[\]^$+*?|.]/,alias:"escape"},t=/\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|c[a-zA-Z]|0[0-7]{0,2}|[123][0-7]{2}|.)/,n="(?:[^\\\\-]|"+t.source+")",i=RegExp(n+"-"+n),s={pattern:/(<|')[^<>']+(?=[>']$)/,lookbehind:!0,alias:"variable"};a.languages.regex={charset:{pattern:/((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,lookbehind:!0,inside:{"charset-negation":{pattern:/(^\[)\^/,lookbehind:!0,alias:"operator"},"charset-punctuation":{pattern:/^\[|\]$/,alias:"punctuation"},range:{pattern:i,inside:{escape:t,"range-punctuation":{pattern:/-/,alias:"operator"}}},"special-escape":e,charclass:{pattern:/\\[wsd]|\\p{[^{}]+}/i,alias:"class-name"},escape:t}},"special-escape":e,charclass:{pattern:/\.|\\[wsd]|\\p{[^{}]+}/i,alias:"class-name"},backreference:[{pattern:/\\(?![123][0-7]{2})[1-9]/,alias:"keyword"},{pattern:/\\k<[^<>']+>/,alias:"keyword",inside:{"group-name":s}}],anchor:{pattern:/[$^]|\\[ABbGZz]/,alias:"function"},escape:t,group:[{pattern:/\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,alias:"punctuation",inside:{"group-name":s}},{pattern:/\)/,alias:"punctuation"}],quantifier:{pattern:/(?:[+*?]|\{(?:\d+,?\d*)\})[?+]?/,alias:"number"},alternation:{pattern:/\|/,alias:"keyword"}},["actionscript","coffescript","flow","javascript","typescript","vala"].forEach((function(e){var t=a.languages[e];t&&(t.regex.inside={"language-regex":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/i,lookbehind:!0,inside:a.languages.regex},"regex-flags":/[a-z]+$/i,"regex-delimiter":/^\/|\/$/})}))}(Prism)}}]);
//# sourceMappingURL=341.ee634685.chunk.js.map