# markupToHtml

If people are using your site to create/edit content, you don't want them forced to use HTML like <div style="float:right"> or whatever.

Also you probably filter any HTML from the user's submission for safety.

With this JS you can now turn

```
{right-align}content blah blah{/right-align}Lorem Ipsum etc {left-align}left aligned content{/left-align}
```

into

```
<div class="right aligned segment">content blah blah</div>Lorem Ipsum etc <div class="left aligned segment">left aligned content</div>

(Well, you can choose the markup tags to replace, and what HTML they'll be replaced with.

## Usage

```
myMarkup = "a string with {{some kind of markup/}}";
myHtml = myMarkup.markupToHtml('{{','/}}','<div class="myclass">','</div>');
```

Uses code from http://blog.stevenlevithan.com/archive/javascript-match-nested
