# InnerCircle

This project aims to create a simple but efficient cryptocurrency trading bot for the binance exchange. Performance is the main target. That's why it makes use of the Binance websockets. It is written in JavaScript and runs on [NodeJS](http://nodejs.org).

#### Getting started

To participate clone the repository and let's gooo :)

<details>
 <summary>Git Workflow</summary>
    <img alt="Git Workflow" src="https://git-scm.com/figures/18333fig0511-tn.png" />
</details>

<details>
 <summary>NodeJS Packages</summary>
    [Tulip](https://github.com/TulipCharts/tulipnode) on Windows
    ```
    npm install tulind
    ```

    [Binance API wrapper](binance-api-node)
    ```
    npm install binance-api-node
    ```
</details>


<details>
 <summary>Issues</summary>
    Installing [TALib](https://github.com/oransel/node-talib) on Windows, aborts with an error 
    "Error: ENOENT: no such file or directory, scandir 'C:\Program Files (x86)\Reference Assemblies\Microsoft\Framework\.NETFramework'"
    ```
    npm install --global --production windows-build-tools
    npm install talib
    ```
</details>