(this["webpackJsonpreact-firebase-authentication"]=this["webpackJsonpreact-firebase-authentication"]||[]).push([[448],{514:function(t,e){!function(t){var e=/[*&][^\s[\]{},]+/,n=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,a="(?:"+n.source+"(?:[ \t]+"+e.source+")?|"+e.source+"(?:[ \t]+"+n.source+")?)";function r(t,e){e=(e||"").replace(/m/g,"")+"m";var n="([:\\-,[{]\\s*(?:\\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|]|}|\\s*#))".replace(/<<prop>>/g,(function(){return a})).replace(/<<value>>/g,(function(){return t}));return RegExp(n,e)}t.languages.yaml={scalar:{pattern:RegExp("([\\-:]\\s*(?:\\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\\2[^\r\n]+)*)".replace(/<<prop>>/g,(function(){return a}))),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp("((?:^|[:\\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)[^\r\n{[\\]},#\\s]+?(?=\\s*:\\s)".replace(/<<prop>>/g,(function(){return a}))),lookbehind:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:r("\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?[ \t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?)?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?"),lookbehind:!0,alias:"number"},boolean:{pattern:r("true|false","i"),lookbehind:!0,alias:"important"},null:{pattern:r("null|~","i"),lookbehind:!0,alias:"important"},string:{pattern:r("(\"|')(?:(?!\\2)[^\\\\\r\n]|\\\\.)*\\2"),lookbehind:!0,greedy:!0},number:{pattern:r("[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+\\.?\\d*|\\.?\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)","i"),lookbehind:!0},tag:n,important:e,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},t.languages.yml=t.languages.yaml}(Prism)}}]);
//# sourceMappingURL=448.4cc45b3e.chunk.js.map