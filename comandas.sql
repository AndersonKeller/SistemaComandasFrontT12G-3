-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 26-Set-2024 às 01:31
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `comandas`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cardapioitems`
--

CREATE TABLE `cardapioitems` (
  `Id` int(11) NOT NULL,
  `Titulo` longtext NOT NULL,
  `Descricao` longtext NOT NULL,
  `Preco` decimal(65,30) NOT NULL,
  `PossuiPreparo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='Cadastro de items do cardapio';

--
-- Extraindo dados da tabela `cardapioitems`
--

INSERT INTO `cardapioitems` (`Id`, `Titulo`, `Descricao`, `Preco`, `PossuiPreparo`) VALUES
(1, 'Xis Tudo', 'pão, frios, maionese, carne, calabresa, coração, frango, alface', '27.000000000000000000000000000000', 1),
(2, 'Xis Frango', 'pão, frios, maionese, frango, alface, tomate', '21.000000000000000000000000000000', 1),
(3, 'Coca Cola Lata', '600ml', '4.000000000000000000000000000000', 0),
(4, 'Coca-cola litro', '2L', '9.000000000000000000000000000000', 0),
(5, 'Batata Frita', '300g', '15.900000000000000000000000000000', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `comandaitems`
--

CREATE TABLE `comandaitems` (
  `Id` int(11) NOT NULL,
  `CardapioItemId` int(11) NOT NULL,
  `ComandaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comandaitems`
--

INSERT INTO `comandaitems` (`Id`, `CardapioItemId`, `ComandaId`) VALUES
(1, 1, 3),
(2, 1, 4),
(3, 2, 4),
(4, 3, 4),
(5, 2, 1),
(6, 3, 1),
(7, 1, 5),
(8, 2, 5),
(9, 3, 5),
(10, 1, 4),
(11, 1, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `comandas`
--

CREATE TABLE `comandas` (
  `Id` int(11) NOT NULL,
  `NumeroMesa` int(11) NOT NULL,
  `NomeCliente` longtext NOT NULL,
  `SituacaoComanda` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `comandas`
--

INSERT INTO `comandas` (`Id`, `NumeroMesa`, `NomeCliente`, `SituacaoComanda`) VALUES
(1, 8, 'lopes', 1),
(2, 4, 'Diogo', 1),
(3, 2, 'Diogo', 1),
(4, 6, 'string', 1),
(5, 4, 'Lopes', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `mesas`
--

CREATE TABLE `mesas` (
  `Id` int(11) NOT NULL,
  `NumeroMesa` int(11) NOT NULL,
  `SituacaoMesa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidocozinhaitems`
--

CREATE TABLE `pedidocozinhaitems` (
  `Id` int(11) NOT NULL,
  `PedidoCozinhaId` int(11) NOT NULL,
  `ComandaItemId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidocozinhaitems`
--

INSERT INTO `pedidocozinhaitems` (`Id`, `PedidoCozinhaId`, `ComandaItemId`) VALUES
(1, 1, 7),
(2, 2, 8),
(3, 3, 10),
(4, 4, 11);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pedidocozinhas`
--

CREATE TABLE `pedidocozinhas` (
  `Id` int(11) NOT NULL,
  `ComandaId` int(11) NOT NULL,
  `SituacaoId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `pedidocozinhas`
--

INSERT INTO `pedidocozinhas` (`Id`, `ComandaId`, `SituacaoId`) VALUES
(1, 5, 1),
(2, 5, 1),
(3, 4, 1),
(4, 4, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nome` longtext NOT NULL,
  `Email` longtext NOT NULL,
  `Senha` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Nome`, `Email`, `Senha`) VALUES
(1, 'Rafael', '<string>', '<string>'),
(2, '<string>', '<string>', '<string>'),
(3, '<string>', '<string>', '<string>'),
(4, '<string>', '<string>', '<string>'),
(5, '<string>', '<string>', '<string>'),
(6, '<string>', '<string>', '<string>'),
(7, '<string>', '<string>', '<string>'),
(8, '<string>', '<string>', '<string>');

-- --------------------------------------------------------

--
-- Estrutura da tabela `__efmigrationshistory`
--

CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `__efmigrationshistory`
--

INSERT INTO `__efmigrationshistory` (`MigrationId`, `ProductVersion`) VALUES
('20240814000928_Criacao_Banco', '8.0.7');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cardapioitems`
--
ALTER TABLE `cardapioitems`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `comandaitems`
--
ALTER TABLE `comandaitems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_ComandaItems_CardapioItemId` (`CardapioItemId`),
  ADD KEY `IX_ComandaItems_ComandaId` (`ComandaId`);

--
-- Índices para tabela `comandas`
--
ALTER TABLE `comandas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `pedidocozinhaitems`
--
ALTER TABLE `pedidocozinhaitems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_PedidoCozinhaItems_ComandaItemId` (`ComandaItemId`),
  ADD KEY `IX_PedidoCozinhaItems_PedidoCozinhaId` (`PedidoCozinhaId`);

--
-- Índices para tabela `pedidocozinhas`
--
ALTER TABLE `pedidocozinhas`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`);

--
-- Índices para tabela `__efmigrationshistory`
--
ALTER TABLE `__efmigrationshistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cardapioitems`
--
ALTER TABLE `cardapioitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `comandaitems`
--
ALTER TABLE `comandaitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de tabela `comandas`
--
ALTER TABLE `comandas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `mesas`
--
ALTER TABLE `mesas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `pedidocozinhaitems`
--
ALTER TABLE `pedidocozinhaitems`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `pedidocozinhas`
--
ALTER TABLE `pedidocozinhas`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `comandaitems`
--
ALTER TABLE `comandaitems`
  ADD CONSTRAINT `FK_ComandaItems_CardapioItems_CardapioItemId` FOREIGN KEY (`CardapioItemId`) REFERENCES `cardapioitems` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_ComandaItems_Comandas_ComandaId` FOREIGN KEY (`ComandaId`) REFERENCES `comandas` (`Id`) ON DELETE CASCADE;

--
-- Limitadores para a tabela `pedidocozinhaitems`
--
ALTER TABLE `pedidocozinhaitems`
  ADD CONSTRAINT `FK_PedidoCozinhaItems_ComandaItems_ComandaItemId` FOREIGN KEY (`ComandaItemId`) REFERENCES `comandaitems` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_PedidoCozinhaItems_PedidoCozinhas_PedidoCozinhaId` FOREIGN KEY (`PedidoCozinhaId`) REFERENCES `pedidocozinhas` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
