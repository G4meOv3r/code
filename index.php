<html>
<head>
    <title> Новый макет </title>

    <!--JS Libs-->
    <script src="../../../js/libs/jquery/jquery.js"></script>
    
    <script src="../../../js/libs/codemirror/lib/codemirror.js"></script>
    <link rel="stylesheet" href="../../../js/libs/codemirror/lib/codemirror.css">

    <link rel="stylesheet" href="../../../js/libs/codemirror/theme/rosecode.css">
    <script src="../../../js/libs/codemirror/mode/python/python.js"></script>
    <script src="../../../js/libs/codemirror/mode/clike/clike.js"></script>

    <!--JS Components-->
    <script src="../../../js/engine/components/component.js"></script>

    <script src="../../../js/engine/components/common/menu/menu.js"></script>
    <script src="../../../js/engine/components/common/table/table.js"></script>
    <script src="../../../js/engine/components/common/notification/notification.js"></script>

    <script src="../../../js/engine/components/auth/login/login.js"></script>
    <script src="../../../js/engine/components/auth/registration/registration.js"></script>

    <script src="../../../js/engine/components/logout/logout/logout.js"></script>

    <script src="../../../js/engine/components/lobby/lobby/lobby.js"></script>
    <script src="../../../js/engine/components/lobby/lobby/privacy/privacy.js"></script>
    <script src="../../../js/engine/components/lobby/lobby/members/members.js"></script>
    <script src="../../../js/engine/components/lobby/lobby/members/member/member.js"></script>

    <script src="../../../js/engine/components/lobby/content/content.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/search.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/competitive.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/card/card.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/start/start.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/info/info.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/found/found.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/found/confirm/confirm.js"></script>
    <script src="../../../js/engine/components/lobby/content/search/competitive/found/info/info.js"></script>
    <script src="../../../js/engine/components/lobby/content/create/create.js"></script>

    <script src="../../../js/engine/components/contest/status/status.js"></script>
    <script src="../../../js/engine/components/contest/status/timer/timer.js"></script>
    <script src="../../../js/engine/components/contest/status/quit/quit.js"></script>
    <script src="../../../js/engine/components/contest/team/team.js"></script>
    <script src="../../../js/engine/components/contest/content/content.js"></script>
    <script src="../../../js/engine/components/contest/content/task/task.js"></script>
    <script src="../../../js/engine/components/contest/content/task/value/value.js"></script>
    <script src="../../../js/engine/components/contest/content/task/code/code.js"></script>
    <script src="../../../js/engine/components/contest/content/task/code/file/file.js"></script>
    <script src="../../../js/engine/components/contest/content/task/code/compiler/compiler.js"></script>
    <script src="../../../js/engine/components/contest/content/task/history/history.js"></script>

    <!--JS Pages-->
    <script src="../../../js/engine/pages/page.js"></script>
    <script src="../../../js/engine/pages/index/index.js"></script>
    <script src="../../../js/engine/pages/auth/auth.js"></script>
    <script src="../../../js/engine/pages/logout/logout.js"></script>
    <script src="../../../js/engine/pages/lobby/lobby.js"></script>
    <script src="../../../js/engine/pages/contest/contest.js"></script>
    <script src="../../../js/engine/pages/package/package.js"></script>

    <!--JS Engine-->
    <script src="../../../js/engine/engine.js"></script>

    <!--Index-->
    <script src="../../../js/index.js"></script>
    <link href="../../../fonts/whitney/stylesheet.css" rel="stylesheet">

    <!--Global Colors-->
    <style>
        :root {
            --primary-color: rgb(50, 50, 55);
            --primary-shadow-color: rgb(200, 200, 200);
            --secondary-color: rgb(255, 255, 255);
            --error-color: rgb(200, 0, 50);
            --atention-color: rgb(255, 180, 0);
            --success-color: rgb(40, 130, 40);

            --code-background-color: var(--secondary-color);
            --code-color: var(--primary-color);
            --code-gutters-background-color: var(--primary-color);
            --code-linenumber-color: var(--secondary-color);
            --code-cursor-color: var(--primary-color);
            --code-selected-background-color: rgb(220, 220, 220);

            --code-comment-color: rgb(80, 140, 50);
            --code-def-color: rgb(20, 150, 120);
            --code-keyword-color: rgb(30, 100, 210);
            --code-builtin-color: rgb(0, 0, 0);
            --code-variable-color: var(--primary-color);
            --code-variable-2-color: var(--primary-color);
            --code-variable-3-color: var(--primary-color);
            --code-string-color: rgb(180, 90, 30);
            --code-number-color: rgb(120, 190, 100);
            --code-atom-color: rgb(80, 150, 210);
            --code-meta-color: rgb(30, 100, 210);
		}
        p::selection {
            color: var(--secondary-color);
            background-color: var(--primary-color);
		}
        p b::selection {
            color: var(--secondary-color);
            background-color: var(--primary-color);
		}
        p i::selection {
            color: var(--secondary-color);
            background-color: var(--primary-color);
		}
    </style>

</head>
<body style="margin: 0px; background-color: var(--secondary-color); color: var(--primary-color)">
</body>
</html>
