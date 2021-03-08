# nodejs-safe-circular-structure

Current package version: **0.0.2**

## How to use

`Coming soon`

<hr>

## Features

<table>
<thead>
<tr>
<th>Name</th>
<th>Type</th>
<th>Version</th>
<th>Description / Features</th>
</tr>
</thead>
<tbody>
<tr>
<td>safeObject</td>
<td>Function</td>
<td>v0.0.1</td>
<td>
<li>
returns new object with same properties and prototype, though with circular structure properties redefined as non-enumerable property
</li>
<li>
allows for JSON.stringify to be used on returned object
</li>
<li>
allows exposure of <b>internal<b> / <b>ownProperties</b> such as Error.message and Error.stack
</li>
</td>
</tr>
<tr>
<td>stringify</td>
<td>Function</td>
<td>v0.0.1</td>
<td>
<li>
Custom JSON stringifier function that uses <b>safeObject</b> for every <i>Object</i> value
</li>
</td>
</tr>
</tbody>
</table>

## Planned features

* stringify
  * Identation
    * With customizable ident-character
  * Html Colorization or Console Colorization
  * As XML
  * As JavaScript
  * As YAML
  * Describe function
    * Function name
    * [Optional] Function body