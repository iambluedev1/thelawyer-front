# THELAWYER FRONTEND

> This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License](http://creativecommons.org/licenses/by-nc-sa/3.0/)
![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/3.0/88x31.png)

## The Lawyer

The Lawyer is a project initialy for the project [VulkanNetwork](https://twitter.com/VulkanNetwork), this allows moderators, administrators and more generally people to find the sanctions of a player on several servers.
This repository refers to the front part of the project.

## Features

- auto-completion of the username
- filter by selecting a specific server or sanction
- also get sanctions of players who have a similar username
- send a refresh action
- export results and hotlinks to a json file

### Export examples

Results  :
```json
{
  "search": {
    "player": "JerediPvP",
    "server": "Tous les serveurs",
    "type": "Toutes les sanctions",
    "like": true
  },
  "result": {
    "warnings": [],
    "kicks": [],
    "bans": [],
    "mutes": [
      {
        "sanction_at": 1518306900,
        "sanction_reason": "Cheat",
        "sanction_by": "Darkidox",
        "sanction_name": "JerediPvP",
        "hotlink_id": 5
      }
    ]
  }
}
````

Hotlinks : 
```json
[{
    "id": 1,
    "name": "kryptonia",
    "type": "json",
    "banlist": "https://kryptonia.fr/core/cache/sanctions_ban.json",
    "website": "https://kryptonia.fr",
    "banCount": 1107,
    "muteCount": 11054,
    "warningCount": 0,
    "kickCount": 0
}, ... ]
````

## Banlists

In order to reference sanctions and to increase efficacity of this project, we based ourselves on differents banlists which are publicly accessible. You can submit your banlist by openning new issue or message on [twitter](https://twitter.com/iambluedev) or [email](mailto:iambluedev@gmx.fr)

Used banlists :

| Name | Banlist | Type |
|---|---|---|
| [Kryptonia](https://kryptonia.fr) | https://kryptonia.fr/core/cache/sanctions_ban.json | json |
| [Senacraft](https://senacraft.fr) | https://senacraft.fr/sanctions | personal |
| [BloodSymphony](https://bloodsymphony.com) | https://bloodsymphony.com/banlist | litebans |
| [EnergyFight](https://energygaming.fr) | https://energygaming.fr/banlist/energyfight | litebans |
| [EnergyCheat](https://energygaming.fr) | https://energygaming.fr/banlist/energycheat | litebans |
| [EnergyPlay](https://energygaming.fr) | https://energygaming.fr/banlist/energyplay | litebans |
| [EnergyWild](https://energygaming.fr) | https://energygaming.fr/banlist/energywild | litebans |
| [SurvivalWorld](https://survivalworld.fr/) | https://ban.survivalworld.fr | fork_litebans |

## Screenshots

![screenshot 1](https://i.imgur.com/NNnhERW.png)
![screenshot 2](https://i.imgur.com/1nbOfEB.png)

## Demo

You can view a demo at : http://thelawyer.cf