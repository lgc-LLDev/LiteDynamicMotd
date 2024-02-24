// LiteLoaderScript Dev Helper
/// <reference path="../HelperLib/src/index.d.ts"/>

/* global mc ll file */

const PLUGIN_NAME = 'LiteDynamicMotd';
/** @type {[number, number, number]} */
const PLUGIN_VERSION = [0, 1, 1];

const PLUGIN_DATA_PATH = `plugins/${PLUGIN_NAME}`;
const PLUGIN_CONFIG_PATH = `${PLUGIN_DATA_PATH}/config.json`;

let pluginConfig = {
  motdList: ['这是第一个Motd', '这是第二个Motd', '这是第三个Motd'],
  switchInterval: 5000,
};

function updateConfig() {
  file.writeTo(PLUGIN_CONFIG_PATH, JSON.stringify(pluginConfig, null, 2));
}

function loadConfig() {
  if (file.exists(PLUGIN_CONFIG_PATH)) {
    const res = file.readFrom(PLUGIN_CONFIG_PATH);
    if (res) pluginConfig = JSON.parse(res);
  } else updateConfig();
}

loadConfig();

let nextMotdIndex = 0;

function changeMotd() {
  const { motdList } = pluginConfig;

  const motd = motdList[nextMotdIndex];
  mc.setMotd(motd);
  // log(motd);

  if (nextMotdIndex === motdList.length - 1) nextMotdIndex = 0;
  else nextMotdIndex += 1;
}

mc.listen('onServerStarted', () => {
  setInterval(changeMotd, pluginConfig.switchInterval);
  changeMotd();
});

ll.registerPlugin(PLUGIN_NAME, '简易动态 Motd 插件', PLUGIN_VERSION, {
  Author: 'student_2333',
  License: 'Apache-2.0',
});
