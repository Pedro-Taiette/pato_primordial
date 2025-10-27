# 🦆 Drones vs Patos: O Despertar do Pato Primordial

> Uma aplicação web interativa que conecta o mundo dos drones de combate ao lendário Pato Primordial.  
> Gere configurações únicas, exporte-as em JSON e use-as dentro do jogo feito em **Godot**.

---

## 🚀 Visão Geral

Este projeto é uma **interface de configuração e visualização** para o jogo **Drones vs Patos**, desenvolvido em **React + TypeScript + TailwindCSS**.  
O jogador pode configurar um drone de combate, definir o status do Pato Primordial, e exportar os dados para o jogo.

O sistema gera um **JSON achatado (flat)** contendo todas as informações necessárias — compatível com o jogo em Godot, hospedado no Itch.io.

🎮 [Jogue agora no Itch.io](https://thiagohaga.itch.io/dronesvspatos)

---

## 🧩 Tecnologias

| Categoria | Tecnologias Usadas |
|------------|-------------------|
| **Frontend** | React (Vite), TypeScript, TailwindCSS |
| **Componentes UI** | Custom UI com estilo Neon/Sci-Fi |
| **Mapas** | React Leaflet + OpenStreetMap (Reverse Geocoding via Nominatim) |
| **Conversões de Unidade** | Sistema métrico (cm/g) e imperial (ft/lb) |
| **Exportação** | JSON flat compatível com Godot Engine |

---

## 📦 Funcionalidades Principais

### 🛸 1. Configuração do Drone
- Escolha entre várias marcas e modelos:
  - **PatoX Alpha, Quacksa Gamma, DSIN Orion**, e outros.
- Cada drone possui atributos fixos (`velocidade`, `danoTiro`, etc.).
- Mostra imagem ilustrativa e turbo stats exclusivos.
- Sistema de *readings* ajustáveis com valores de 1 a 10.

### 🦆 2. Pato Primordial
- Ajuste altura e peso (em cm/g ou ft/lb).
- Defina o estado:
  - `Despertado` (permite escolher um superpoder)
  - `Transe`
  - `Hibernação`
- Controle batimentos cardíacos (para transe/hibernação).
- Selecione superpoderes:
  - **Tempestade Elétrica**
  - **Hyper Raio**
  - **Floresta Mágica**
- Configure mutações com pontuação e tier (Comum → Anômala).

### 🌎 3. Localização Geográfica
- Escolha o país, cidade e ponto no mapa.
- Detecção automática de **ponto de referência** (landmark).
- Campos de país de origem e coordenadas com conversão instantânea.

### 🧠 4. Dashboard Interativo
- Exibe resumo do drone e do pato com imagens.
- Mostra detalhes da localização e país de origem.
- Gera o JSON compatível com o jogo.
- **Botões rápidos**:
  - `Salvar Pato Primordial` → copia o JSON para a área de transferência.
  - `Embarcar para a Missão` → abre o jogo e cola o JSON lá.
    
---

## 🧮 JSON Gerado

O JSON exportado é **plano** e contém todos os dados essenciais:

```json
{
  "drone_brand": "PatoX",
  "drone_modelId": "patox-alpha",
  "drone_serial": "PTX-ALPHA-001",
  "drone_velocidade": 8,
  "drone_danoTiro": 7,
  "drone_precisao": 6,
  "pato_height": 120,
  "pato_weight": 5000,
  "pato_hibernation": "transe",
  "pato_bpm": 42,
  "pato_mutation_tier": "Rara",
  "origin_country": "Brasil",
  "location_city": "Marília",
  "location_country": "Brasil",
  "location_lat": -22.2,
  "location_lon": -49.9,
  "location_landmark": "Ponto conhecido"
}
````

---

## 💾 Como Rodar o Projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/drones-vs-patos.git
cd drones-vs-patos
```

### 2. Instalar dependências

```bash
npm install
# ou
pnpm install
```

### 3. Rodar o servidor de desenvolvimento

```bash
npm run dev
```

O projeto abrirá em:
👉 **[http://localhost:5173](http://localhost:5173)**

---

## 🦾 Licença

MIT License © 2025
Sinta-se livre para usar, modificar e adaptar este projeto - contanto que mantenha o espírito do **Pato Primordial** vivo.

> *"Nem todos os heróis voam... alguns nadam e lançam raios."* ⚡
