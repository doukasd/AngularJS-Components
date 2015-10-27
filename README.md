# AngularJS Components

A collection of random reusable drop-in components for AngularJS.
## Contents
### dd-text-collapse
A directive that can easily be used on text areas/fields to automatically truncate/collapse/shrink text to a specific character limit, adding a "show more/less" toggle. Previously "dd-collapse-text".

Thanks to [@micabot](https://github.com/micabot) for the improvements.

*Result:*

![image](https://raw.githubusercontent.com/doukasd/AngularJS-Components/master/dd-text-collapse/dd-text-collapse-result.png)

*HTML Escape:*

All content is html escaped. 
Turn off escaping content by using
	dd-text-collapse-escape="false"

*Auto newline to &lt;br&gt; Feature:*

If expanded, all newlines are converted to &lt;br&gt;
Turn off nl2br content by using
	dd-text-collapse-nl2br="false"
